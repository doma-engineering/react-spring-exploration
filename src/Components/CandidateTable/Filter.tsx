import { useAtom } from "jotai";
import { filterData } from "./candidateTableAtoms";

const Filter = () => {

  const [ filter, setFilter ] = useAtom( filterData );

  //TODO: There can take not index bur current rank, need to think about that.
  const rankOnClick = ( index: number ): void => {
    const newSelect = [...filter];
    newSelect[index].isSelected = !newSelect[index].isSelected;
    setFilter( newSelect );
  }

  return(
    <div className="Filter">
      {
        filter.map(
          (rank, index) => 
            (
              <button
                className="FilterButton"
                key={ "FB" + index.toString() }
                onClick={ () => rankOnClick( index ) } 
                style={{
                  textDecoration: rank.isSelected ? "none": "line-through",
                  background: rank.color+"AA",
                }}    
              >
                {rank.name}
              </button>
            )
          )
      }
    </div>
  );
}

export default Filter;