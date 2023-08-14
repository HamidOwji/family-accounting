import React from "react";
import AppFrame from "../Components/AppFrame";
import CustomTable from "../Components/CustomTable";

export default function CategoryPage({ category }) {
    return (
        <AppFrame>
            <CustomTable category={category} />
        </AppFrame>
    )
}