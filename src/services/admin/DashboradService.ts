import type { DashboardStats } from "../../types/dashboard";
import axiosInstance from "../axiosInstance";

export class DashboradServices{
    static async getDashboardData(): Promise<DashboardStats> {
        try {
            const response = await axiosInstance.get("admin/dashboard-stats");
            return {
                totalUsers: response.data.stats.userCount,
                totalOrders: response.data.stats.pendingOrdersCount,
                totalProducts: response.data.stats.productCount
            }  satisfies DashboardStats
        } catch (error) {
            throw error;
        }
    }
}