const TermsAndConditionsPage = () => {
    return (
        <div className="flex flex-col items-center text-slate-200 text-lg">
            <div className="bg-slate-700 w-5/6 px-5 pb-5 rounded-b shadow shadow-slate-900/50">
                <p className="text-xl font-bold mt-5">Terms</p>
                <ul className="list-disc pl-5">
                    <li>Be good person</li>
                    <li>smile! {':)'}</li>
                </ul>
                <p className="text-xl font-bold mt-4">Conditions</p>
                <ul className="list-disc pl-5">
                    <li>There Zero legal force</li>
                </ul>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;
