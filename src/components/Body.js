import RestaurantCard from "./Restaurantcard";
import restaurantList from "../utils/mockdata";
import { useState } from "react";

const filterData = (searchInput, listofRestaurant) => {
    const filterData = listofRestaurant.filter((listofRestaurant) => {
        listofRestaurant.data.name.includes(searchInput)  
    });
    return filterData; 
}

const Body = () => {

    const [listofRestaurant, setlistofRestaurant] = useState(restaurantList);

    const [searchInput, setsearchInput] = useState();

    return(
        <div className='body'>
            <div className='filter'>
                <button className='filter-btn'
                onClick={ () => {
                    const filteredList = listofRestaurant.filter(
                        (res) => res.data.avgRating > 3.8
                    );
                    setlistofRestaurant(filteredList);
                }}>
                Top rated Restaurants
                </button>
            </div>
            <div className="search-container">
                <input type="text" 
                className="search-input" 
                placeholder="Search" 
                value={searchInput} 
                onChange={(e) => {
                    setsearchInput(e.target.value);
                }}
                />
                <button className="search-btn"
                onClick={() => {
                    const data = filterData(searchInput, listofRestaurant);
                    setlistofRestaurant(data);
                }}>
                Search</button>
            </div>
            <div className='res-container'>
                {
                    listofRestaurant.map((restaurant) => (
                        <RestaurantCard key={restaurant.data.id} resData={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Body;