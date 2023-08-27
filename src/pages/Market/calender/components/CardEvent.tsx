// import { useGetEventPDFQuery } from 'api/queries/getEventQueries';
// import routes from 'api/routes';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

type CardEventType = {
	data: GetEventType
}

const CardEvent = ({ data }: CardEventType) => {
	const handleFetchPDF = () => {
		new Promise<void>((done, reject) => {
			const headers = new Headers();
			headers.append("Accept", "application/json, text/plain, */*");
			headers.append("Accept-Language", "en-US,en;q=0.9,fa;q=0.8");

			const client_id = Cookies.get("client_id");
			if (client_id) headers.append("Authorization", "Bearer " + client_id);

			fetch(""+ '?' + new URLSearchParams({ id: String(data.id) }), {
				method: "GET",
				headers: headers,
				redirect: "follow",
			})
				.then((response) => response.blob())
				.then((blobResponse) => {
					const win = window.open("", "", "height=595,width=842");
					if (!win) return;

					// Write the PDF file to the new window's document
					const fileReader = new FileReader();
					fileReader.onload = () => {
						const pdfData = fileReader.result;
						win.document.write(`<html><head><title>${data.title} - ${data.symbolName}</title></head><body><embed width="100%" height="100%" src="${pdfData}" type="application/pdf" /></body></html>`);
						win.document.close(); // Close the document to ensure it's fully loaded
					};
					fileReader.readAsDataURL(blobResponse);
					done();
				})
				.catch(reject);
		});
	};

	return (
		<div
			tabIndex={-1}
			role="button"
			style={{ maxWidth: '220px' }}
			onClick={handleFetchPDF}
			className={clsx("p-1 rounded-md flex justify-between items-center gap-5 m-2 text-L-gray-700 dark:text-D-gray-700 w-full text-xs cursor-pointer", {
				"bg-L-info-50 dark:bg-D-info-50": data.type === "InterestPayment",
				"bg-L-success-100 dark:bg-D-success-100": data.type === "Meeting"
			})}
		>
			<span>{data.symbolName} - {data.title}</span>
			<span className='text-L-gray-500 dark:text-D-gray-500'>{dayjs(data.date).format("HH:mm")}</span>
		</div>
	);
};

export default CardEvent;
