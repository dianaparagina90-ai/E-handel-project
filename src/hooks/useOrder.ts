import { useQuery } from "@tanstack/react-query"
import {type Order } from "../types/types"
import { getOrder } from "../api/order"

export const useOrder = (id: string) => {
    return useQuery<Order>({
        queryKey : ["order", id],
        queryFn : ()=> getOrder(id),
        enabled: !!id,
        throwOnError: true,

    })
}


