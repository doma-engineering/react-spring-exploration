import UniversalTable from '../UniversalTable/UniversalTable';
import Header from './Header';

const DecorativePageContent = ({ PageName }: { PageName: string }) => {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <Header />
            </div>
            <div className="text-center text-stone-200 text-5xl py-5">
                {PageName}
            </div>
            <div className="flex justify-center mt-5 pb-20">
                <UniversalTable />
            </div>
        </div>
    );
};
export default DecorativePageContent;
