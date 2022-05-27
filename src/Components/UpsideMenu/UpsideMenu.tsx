import ToLoginButton from "../Login/toLoginButton";

const UpsideMenu = () => {

  return (
    <div className="bg-slate-900 border-b border-slate-600 flex justify-between">
      <div className="flex">
        <button className="flex p-2">
          <img className="w-10 h-10 ml-5 invert" src="https://raw.githubusercontent.com/doma-engineering/design-exploration/main/layout%20prototype/LogoPlay-04.png" alt="OHR logo" />
          <div className="text-white font-mono text-4xl">∅HR</div>
        </button>

        <div className="ml-10">
          <button className="px-4 h-full upsideCategory">
            Companies
          </button>
          <button className="px-4 h-full upsideCategory">
            Tasks
          </button>
          <button className="px-4 h-full upsideCategory">
            Community
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <ToLoginButton text="logout" style="px-5 mr-5 border-2 p-1 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900" />
      </div>
    </div>
  );
}

export default UpsideMenu;