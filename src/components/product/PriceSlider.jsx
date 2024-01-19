import * as React from "react";
import Slider from "@mui/material/Slider";

import Box from "@mui/material/Box";
import { useFilterContext } from "../../context/filterContext";

function valuetext(value) {
  return `${value}`;
}

const PriceSlider = () => {
  const { getMaxMinPrice, filterProducts, allProducts } = useFilterContext();

  const prices = allProducts.map((product) => product.price);
  let highestPrice = Math.max(...prices);
  let lowestPrice = Math.min(...prices);

  const initialSliderValue = [lowestPrice, highestPrice];
  const [value, setValue] = React.useState(initialSliderValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getMaxMinPrice(value);
  }, [value]);

  return (
    <div>
      <h1 className="text-lg font-bold mb-5 text-gray-800">Prices</h1>
      <Box sx={{ width: "80%" }}>
        <Slider
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          color="secondary"
          min={Math.trunc(lowestPrice/100)}
          max={Math.trunc(highestPrice/100)}
        />
      </Box>
    </div>
  );
};

export default PriceSlider;
