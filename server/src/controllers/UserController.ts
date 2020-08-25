import { Request, Response } from 'restify';
import { isEmpty } from 'lodash/fp';
import { IUser } from '../models/interfaces/IUser';
import { IAuthUser } from '../models/interfaces/IAuth';
import {
  successResponse,
  badRequestResponse,
  internalServerErrorResponse,
  failedServerRespnose,
  unauthorizedResponse
} from '../responses/responses';
import { BaseController } from './BaseController';
import { Helpers } from '../lib/helpers';
import { IMedia } from '../models/interfaces/IMedia';
import { Types } from 'mongoose';
require('dotenv').config();

export class UserController extends BaseController<IUser> {
  protected _helpers = new Helpers();

  //
  //? ──────────────────────────────────────────────────────── AUTHENTICATE USER ─────
  //
  /**
   *
   * @param req
   * @param res
   */
  protected async isUserAuthenticated(req: Request, res: Response): Promise<void> {
    try {
      const verifiedUser: IUser = await this._helpers.verfiyJwtToken(req.headers.authorization);
      verifiedUser
        ? successResponse<null, IAuthUser>(res, null, null, `User ${Object(verifiedUser).firstName} ist erfolgreich authentifiziert`, {
            authUser: verifiedUser,
            isAuthenticated: true,
            jwtToken: req.headers.authorization
          })
        : badRequestResponse(res, `Fehler beim authentifizieren des Users ${Object(verifiedUser).firstName}`);
    } catch (error) {
      internalServerErrorResponse(res, null, null, 'Fehler beim authentifizieren des Users', error.message);
    }
  }

  //
  //? ─────────────────────────────────────────────────────────────── LIST USERS ─────
  //
  /**
   *
   * @param req
   * @param res
   */
  protected async list(req: Request, res: Response): Promise<IUser[]> {
    try {
      const results: IUser[] = await this._repository.list();

      if (!results) {
        failedServerRespnose<IUser>(res, null, null, 'Es trat ein Fehler beim laden aller User auf');
        return null;
      }

      const mapToNames = mapUserSpecificProps(results);

      results.length > 0
        ? successResponse<IUser>(res, null, mapToNames as IUser[])
        : successResponse<IUser>(res, null, [], 'Es gibt derzeit keine User');
    } catch (error) {
      internalServerErrorResponse(res, null, null, 'Error beim laden aller User', error.message);
    }
  }

  //
  //? ──────────────────────────────────────────────────────────── REGISTER USER ─────
  //
  /**
   *
   * @param req
   * @param res
   */
  protected async register(req: Request, res: Response): Promise<void> {
    const files = Object.keys(req.files).length ? true : false;
    const fileUrl = typeof req.body.fileUrl == 'string' ? true : false;

    if (Object(req.body).socialMediaUrl) {
      const socialMediaUrl = Object(req.body).socialMediaUrl;
      Object(req.body).socialMediaUrl = JSON.parse(socialMediaUrl);
    }

    if (req.body.secretKey.trim() === process.env.SECRET_KEY) {
      req.body.password = await this._helpers.encrypt(req.body.password);
      if (!files && !fileUrl) {
        try {
          const result: IUser = await this._repository.create(req.body);
          const results: IUser[] = await this._repository.list();
          !isEmpty(result)
            ? successResponse<IUser>(res, result, results, `Hey ${result.firstName}, du wurdest erfolgreich registriert 🥳`)
            : failedServerRespnose<IUser>(res, null, null, `Es trat ein Fehler beim der Resgistrierung des Users ${result.firstName}`);
        } catch (error) {
          internalServerErrorResponse(res, null, null, 'Es trat ein Fehler beim der Resgistrierung eines Users auf', error.message);
        }
      } else {
        try {
          const result = await this.createByFileReference(req, res);
          const results: IUser[] = await this._repository.list();
          !isEmpty(result)
            ? successResponse<IUser>(res, result, results, `Hey ${result.firstName}, du wurdest erfolgreich registriert 🥳`)
            : failedServerRespnose<IUser>(res, null, null, `Es trat ein Fehler beim der Resgistrierung des Users ${result.firstName}`);
        } catch (error) {
          internalServerErrorResponse(res, null, null, 'Es trat ein Fehler beim der Resgistrierung eines Users auf', error.message);
        }
      }
    } else {
      badRequestResponse(res, 'Du bist kein valider User');
    }
  }

  //
  //? ───────────────────────────────────────────────────────────── SIGN IN USER ─────
  //
  /**
   *
   * @param req
   * @param res
   */
  protected async signIn(req: Request, res: Response): Promise<void> {
    try {
      const result: IUser = await this._repository.searchForItem(req.body.email);
      const isPasswordEqual: boolean = await this._helpers.comparingPasswords(req.body.password, result.password);

      if (isPasswordEqual && !isEmpty(result)) {
        const jwtToken = await this.getJwtTokenFromUser(result);
        jwtToken
          ? successResponse<null, IAuthUser>(res, null, null, `Hey ${result.firstName}, du bist erfolgreich eingeloggt`, {
              isAuthenticated: true,
              jwtToken: jwtToken,
              authUser: result
            })
          : failedServerRespnose<IAuthUser>(res, null, null, 'Es trat ein Fehler beim einloggen des Users auf');
      } else {
        unauthorizedResponse<IAuthUser>(
          res,
          {
            isAuthenticated: false,
            jwtToken: null,
            authUser: null
          },
          null,
          'Die Nutzerdaten stimmen nicht überein'
        );
      }
    } catch (error) {
      internalServerErrorResponse(res, null, null, 'Es trat ein Fehler beim login eines Users auf', error.message);
    }
  }

  //
  //? ────────────────────────────────────────────────────────────── UPDATE USER ─────
  //
  /**
   *
   * @param req
   * @param res
   */
  protected async update(req: Request, res: Response): Promise<void> {
    //! Optional chaining
    const { id } = req.params;
    const { authorization } = req.headers;
    const { password } = req.body;

    const hasMedia = req.files.length ? true : false;
    const fileUrl = typeof req.body.fileUrl == 'string' ? true : false;

    try {
      const authResult: boolean = await this._helpers.authorizeItem(id, authorization);
      const passwordEnc: string = await this._helpers.encrypt(password);
      if (passwordEnc && authResult) {
        req.body.password = passwordEnc;

        if (!hasMedia && !fileUrl) {
          try {
            const result: IUser = await this._repository.update(id, req.body);
            const results: IUser[] = await this._repository.list();
            const jwtToken = await this.getJwtTokenFromUser(result);

            successResponse<IUser, IAuthUser>(res, result, results, `User ${result.firstName} wurde erfolgreich aktualisiert`, {
              authUser: result,
              jwtToken,
              isAuthenticated: true
            });
          } catch (error) {
            internalServerErrorResponse(res, null, null, 'Es trat ein Fehler beim aktualisieren eines Users auf', error.message);
          }
        } else {
          try {
            await this.removeMediaFromDiscAndDatabase(id);
            const result: IUser = await this.updateByFileReference(req, res, id);
            const jwtToken = await this.getJwtTokenFromUser(result);
            const results: IUser[] = await this._repository.list();
            if (result && results && jwtToken) {
              successResponse<IUser, IAuthUser>(res, result, results, `User ${result.firstName} wurde erfolgreich aktualisiert`, {
                authUser: result,
                jwtToken,
                isAuthenticated: true
              });
            } else {
              failedServerRespnose(res, null, null, 'Es trat ein Fehler beim aktualisieren des Users auf');
            }
          } catch (error) {
            internalServerErrorResponse(res, null, null, 'Es trat ein Fehler beim aktualisieren eines Users auf', error.message);
          }
        }
      } else {
        failedServerRespnose(res, null, null, 'Es trat ein Fehler beim der Authentifizierung des Users auf');
      }
    } catch (error) {
      internalServerErrorResponse(res, null, null, 'Es trat ein Fehler beim der Authentifizierung eines Users auf', error.message);
    }
  }

  //
  //? ─────────────────────────────────────────────────────────────── DELTE USER ─────
  //
  /**
   *
   * @param req
   * @param res
   */
  protected async remove(req: Request, res: Response): Promise<void> {
    try {
      try {
        const result: IUser = await this._repository.delete<IUser>(req.params.id);
        await this.removeMediaFromDiscAndDatabase(result.id);
        const results: IUser[] = await this._repository.list();
        !isEmpty(result)
          ? successResponse<IUser>(res, result, results, `User ${result.firstName}, wurde erfolgreich gelöscht 🥳`)
          : failedServerRespnose<IUser>(res, null, null, `Es trat ein Fehler beim löschen des Users ${result.firstName}`);
      } catch (error) {
        internalServerErrorResponse(res, error.message);
      }
    } catch (error) {
      internalServerErrorResponse(res, error.message);
    }
  }

  private async removeMediaFromDiscAndDatabase(id: Types.ObjectId) {
    const populateMediaFromUser: IMedia = await this._repository.getByIdAndRefId<IMedia>(id, 'refId');
    if (populateMediaFromUser) {
      const filePath = populateMediaFromUser.filePath;
      await this._helpers.deleteFileToFolder(filePath);
      await this._repository.delete<IMedia>(populateMediaFromUser.id);
    }
  }

  private async getJwtTokenFromUser(result: IUser) {
    const { _id, firstName, lastName, email, instrument, refId, comment } = result;
    const jwtToken = await this._helpers.createJwtToken({
      _id,
      firstName,
      lastName,
      email,
      instrument,
      refId,
      comment
    });
    return jwtToken;
  }
}

function mapUserSpecificProps(results: IUser[]) {
  return results.map((user: IUser) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    instrument: user.instrument,
    refId: user.refId,
    comment: user.comment
  }));
}
