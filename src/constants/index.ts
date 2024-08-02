export const DISH_CACHE_KEY = ['dishes']
export const CATEGORY_CACHE_KEY = ['categories']
export const TABLE_CACHE_KEY = ['tables']
export const getOrderCacheKey = (tableId?: number) => {
    return tableId ? ['orders', tableId] : ['orders']
}
export const getOrderItemCacheKey = (orderId: number) => {
    return ['orderItems', orderId]
}

export const getDishImageCacheKey = (dishId: number) => {
    return ['dishImage', dishId]
}