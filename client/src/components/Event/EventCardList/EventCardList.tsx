import { ApplicationEventAction, IReduxListEventsAction } from "../../../store/types/event.types";
import { Segment, Card, Button, Dimmer, Loader, Header, Container, Grid, GridColumn } from "semantic-ui-react";
import { IEvent, IReduxState, IUser } from "../../../models";
import React, { useEffect, Fragment, useState } from "react";
import { ModalDialog } from "../../ModalDialog";
import { EventCard, EventCardForm } from "../";
import { isArray } from "lodash";
import { EKindOfEventAction } from "../../../enums";
import { filterByActualYear, parseToDateFormat, sortedArray } from "../../../lib";
import moment from "moment";

type IStateProps = {
	readonly isAuthenticated: boolean;
	readonly isLoading: boolean;
	readonly events: IEvent[];
};

type IDispatchProps = {
	onListEvents(): Promise<ApplicationEventAction>;
	onAddEvent(event: IEvent): Promise<ApplicationEventAction>;
	onUpdateEvent(id: string, event: IEvent): Promise<ApplicationEventAction>;
	onRemoveEvent(id: string): Promise<ApplicationEventAction>;
};

const EventCardList: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { events, isLoading, isAuthenticated, onListEvents, onAddEvent, onUpdateEvent, onRemoveEvent } = props;
	const [ modalStatus, setModalStatus ] = useState<{ modalOpen: boolean }>({ modalOpen: false });

	useEffect(
		() => {
			onListEvents();
		},
		[ onListEvents ]
	);

	const openModalDialogEditForm = (): void => {
		setModalStatus({ modalOpen: true });
	};

	const onCloseEvent = (): void => {
		setModalStatus({ modalOpen: false });
	};

	const handleCancelEvent = (): void => {
		onCloseEvent();
	};

	const modalTriggerButton = (
		<Fragment>
			{isAuthenticated && (
				<Button
					circular
					content="Neues Event"
					icon="add"
					labelPosition="right"
					color="blue"
					onClick={openModalDialogEditForm}
				/>
			)}
		</Fragment>
	);

	const renderEventCards = (events: IEvent[]) => {
		if (!isLoading) {
			if (isArray(events) && events.length > 0) {
				// Sort by Date
				const sortedArray = events.slice().sort(function(a, b) {
					const c = new Date(parseToDateFormat(a.eventDate));
					const d = new Date(parseToDateFormat(b.eventDate));
					return +c - +d;
				});

				// filter by Date
				const filteredArray = sortedArray.filter((date) => filterByActualYear(date.eventDate));
				filteredArray.length = 3;

				const toogleVisibility = isAuthenticated ? sortedArray : filteredArray.filter((e) => e.hidden !== true);
				return toogleVisibility.map((mapEvent: IEvent) => (
					<Grid.Column largeScreen="5" computer="5" tablet="6" mobile="16">
						<EventCard
							onRemoveEvent={onRemoveEvent}
							updateEvent={onUpdateEvent}
							isAuthenticated={isAuthenticated}
							event={mapEvent}
							children={modalStatus}
						/>
					</Grid.Column>
				));
			} else {
				return (
					<Fragment>
						<Header as="h2">
							Es gibt derzeit keine Events...{" "}
							<span role="img" aria-label="sleeping-emoji">
								😴
							</span>
						</Header>
					</Fragment>
				);
			}
		} else {
			return (
				<Dimmer active inverted page>
					<Loader inline />
				</Dimmer>
			);
		}
	};

	return (
		<section>
			<Header className="headline" textAlign="center">
				KONZERTE
			</Header>
			<ModalDialog trigger={modalTriggerButton} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
				<EventCardForm
					showToggleHidden
					headerText="Neues Event"
					onAddEvent={onAddEvent}
					kindOfAction={{ kind: EKindOfEventAction.NEW_EVENT }}
					handleCancelEvent={handleCancelEvent}
				/>
			</ModalDialog>
			<Grid stackable columns={4} stretched doubling centered>
				<Grid.Row>{renderEventCards(events)}</Grid.Row>
			</Grid>
		</section>
	);
};

export default EventCardList;
