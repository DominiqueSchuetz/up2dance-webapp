import { Form, Segment } from "semantic-ui-react";
import { GoogleMaps } from "../../GoogleMaps";
import React, { Fragment } from "react";

const EventCardForm: React.FC = () => {
	return (
		<Fragment>
			<Form>
				<Form.Group widths="equal">
					<Form.Input
						error="Bitte gib noch den Namen der Veranstaltung ein"
						required
						fluid
						label="Veranstaltungsname"
						placeholder="Veranstaltungsname"
					/>
					<Form.Input
						error="Bitte gib noch die Art der Veranstaltung ein"
						required
						fluid
						label="Veranstaltungsart"
						placeholder="Veranstaltungsart"
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Input
						error="Bitte gib noch ein Datum für die Veranstaltung ein"
						required
						type="date"
						fluid
						label="Datum"
						placeholder="Datum"
					/>
					<Form.Input
						error="Bitte gib noch den Beginn der Veranstaltung ein"
						required
						type="time"
						fluid
						label="Beginn"
						placeholder="Beginn"
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Input type="text" fluid label="Eintritt" placeholder="Eintritt" />
				</Form.Group>
				<Form.Group>
					<Segment raised>{<GoogleMaps />}</Segment>
				</Form.Group>
			</Form>
		</Fragment>
	);
};

export default EventCardForm;
