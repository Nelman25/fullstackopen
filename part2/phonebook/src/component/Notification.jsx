/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
	return (
		<div
			className={`w-1/2 text-center font-mono px-4 py-2 rounded-xl my-4 mx-auto text-white ${notification.message === "Added " ? "bg-green-400 border border-green-700" : "bg-red-400 border border-red-700"}`}
		>
			{notification.message} {notification.name}
		</div>
	);
};

export default Notification;
