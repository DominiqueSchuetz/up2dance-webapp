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
		<Container textAlign="center" style={{ marginTop: 90, marginBottom: 0, marginRight: 40 }}>
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
		</Container>
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
					<Fragment key={mapEvent._id}>
						<Grid.Column stretched textAlign="center">
							<EventCard
								onRemoveEvent={onRemoveEvent}
								updateEvent={onUpdateEvent}
								isAuthenticated={isAuthenticated}
								event={mapEvent}
								children={modalStatus}
							/>
						</Grid.Column>
					</Fragment>
				));
			} else {
				return (
					<Fragment>
						<Segment raised style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}>
							<Header as="h2">
								Es gibt derzeit keine Events...{" "}
								<span role="img" aria-label="sleeping-emoji">
									😴
								</span>
							</Header>
						</Segment>
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
			<Container text style={{ marginTop: "100px", marginBottom: "100px" }}>
				<Header as="h1" style={{ fontSize: "3em" }} textAlign="center">
					KONZERTE
				</Header>
			</Container>
			<ModalDialog trigger={modalTriggerButton} modalStatus={modalStatus.modalOpen} onClose={onCloseEvent}>
				<EventCardForm
					showToggleHidden
					headerText="Neues Event"
					onAddEvent={onAddEvent}
					kindOfAction={{ kind: EKindOfEventAction.NEW_EVENT }}
					handleCancelEvent={handleCancelEvent}
				/>
			</ModalDialog>
			<Grid
				container
				columns={3}
				textAlign="center"
				doubling
				style={{ marginTop: 50, marginBottom: 0, marginRight: 40 }}
			>
				{renderEventCards(events)}
			</Grid>
		</section>
	);
};

export default EventCardList;
