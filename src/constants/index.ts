export const DISH_CACHE_KEY = ['dishes']
export const CATEGORY_CACHE_KEY = ['categories']
export const TABLE_CACHE_KEY = ['tables']
export const getOrderCacheKey = (tableId?: number) => {
    return tableId ? ['orders', tableId] : ['orders']
}

interface OrderItemProps {
    orderId?: number
    billId?: number
}

export const getOrderItemCacheKey = ({orderId, billId}: OrderItemProps) => {
    return orderId ? ['orderItems', orderId] : ['orderItems', billId]
}

export const getDishImageCacheKey = (dishId: number) => {
    return ['dishImage', dishId]
}