import RestaurantCard from "./Restaurantcard";
import restaurantList from "../utils/mockdata";
import { useState, useEffect } from "react";

const filterData = (searchInput, listofRestaurant) => {
    const filterData = listofRestaurant.filter((listofRestaurant) => {
        listofRestaurant.data.name.includes(searchInput)  
    });
    return filterData; 
}

const Body = () => {

    const [listofRestaurant, setlistofRestaurant] = useState(restaurantList);
    const [searchInput, setsearchInput] = useState("");

    useEffect(() => {
         getRestaurant();
    }, [])

    async function getRestaurant(){
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json();
        setlistofRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    }

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