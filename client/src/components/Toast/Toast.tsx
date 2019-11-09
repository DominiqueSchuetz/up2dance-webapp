import { Header, Segment, Message, TransitionablePortal } from "semantic-ui-react";
import React, { Fragment, useState, useEffect } from "react";

interface IStateProps {
	message: string;
	success: boolean;
}

interface IDispatchProps {}

const Toast: React.FC<IStateProps & IDispatchProps> = (props) => {
	const { message, success } = props;
	const [ showToast, setShowToast ] = useState(false);

	useEffect(
		() => {
			console.log("toast is called ");

			//setShowToast(true);
			return () => {
				setShowToast(true);
				setInterval(() => {
					setShowToast(false);
				}, 100);
			};
		},
		[ message, success ]
	);

	return (
		<Fragment>
			<TransitionablePortal
				closeOnTriggerClick
				openOnTriggerClick
				transition={{ animation: "fade down", duration: 2000 }}
				open={showToast}
			>
				<Segment
					style={{ width: "500px", left: "50%", right: "50%", position: "fixed", top: "0%", zIndex: 1000 }}
				>
					<Message icon="inbox" header={message} color={success ? "green" : "red"} />
				</Segment>
			</TransitionablePortal>
		</Fragment>
	);
};

export default Toast;
