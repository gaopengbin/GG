import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const usePlansStore = defineStore('plans', {
    // 其他配置...
    state: () => ({
        plans: [
            { id: 1, name: 'Basic', price: 10 },
            { id: 2, name: 'Pro', price: 20 },
        ],
        currentPlan: null as any,
        weatherInfo: null as any,
        location: null as any,
    }),
    getters: {
        getCurrentPlan: (state) => state.currentPlan
    },
    actions: {
        setCurrentPlan(plan: any) {
            this.currentPlan = plan
        }
    },
    persist: true
})