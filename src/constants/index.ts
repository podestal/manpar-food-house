export const DISH_CACHE_KEY = ['dishes']
export const CATEGORY_CACHE_KEY = ['categories']
export const TABLE_CACHE_KEY = ['tables']
export const getOrderCacheKey = (tableId?: number) => {
    return tableId ? ['orders', tableId] : ['orders']
}

interface OrderItemProps {
    orderId?: number
    billId?: number
    getToday?: boolean
}

export const getOrderItemCacheKey = ({orderId, billId, getToday}: OrderItemProps) => {
    // let key = 'order-items/?order=&table=&bill=&created_at=2024-08-05'
    let key: any = ['orderItems']
    if (getToday) {
        key = ['orderItems', 'todays']
    } else if (billId) {
        key = ['orderItems', billId]
    } else if (orderId) {
        key = ['orderItems', orderId]
    }
    return key
}

export const getDishImageCacheKey = (dishId: number) => {
    return ['dishImage', dishId]
}