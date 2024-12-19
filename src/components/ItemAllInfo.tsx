import React from 'react';
import { Skeleton, Textarea} from "@nextui-org/react";
import {UseQueryResult} from "react-query";
import {GetItemResponse} from "../models/response/GetItemResponse";

interface Props {
    itemQuery: UseQueryResult<GetItemResponse>
}

function ItemAllInfo({itemQuery}: Props) {

    return (
        <div className={`flex flex-col items-start gap-2`}>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[24px] rounded`}>
                {itemQuery.isSuccess && <h3 className={`text-2xl`}>{itemQuery.data.title}</h3>}
            </Skeleton>
            <hr className="w-full h-[2px]"/>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[24px] rounded`}>
                {itemQuery.isSuccess &&
					<h3 className={`text-md text-primary font-bold`}>{itemQuery.data.cost}</h3>}
            </Skeleton>
            <Skeleton isLoaded={itemQuery.isSuccess} className={`w-full h-[100px] rounded mt-4`}>
                {itemQuery.isSuccess && <div>
			        <Textarea
				        label="Description"
				        value={itemQuery.data.productDescription}
				        readOnly={true}
                        // className={`w-[60%]`}
				        classNames={{
                            inputWrapper: "border border-neutral-200 bg-white rounded",
                        }}
					/>
				</div>}
            </Skeleton>

        </div>
    );
}

export default ItemAllInfo;
