import {
  Balances,
  DashboardWidget,
  Debts,
  DueSoonBill,
  Entry,
  MonthBalance,
  MonthDebt,
  MonthEntry,
  MonthStocks,
} from '../model';
import { api } from './api';

export namespace DashboardService {
  const CONTROLLER = 'dashboard';

  export async function getWidgets() {
    return (await api.get<DashboardWidget[]>(`${CONTROLLER}/getWidgets`)).data;
  }

  export async function getAll() {
    return (await api.get<Entry[]>(`${CONTROLLER}/getAll`)).data;
  }

  export async function getBalances() {
    return (await api.get<Balances>(`${CONTROLLER}/getBalances`)).data;
  }

  export async function getDebts() {
    return (await api.get<Debts>(`${CONTROLLER}/getDebts`)).data;
  }

  export async function getDueSoonBills() {
    return (await api.get<DueSoonBill[]>(`${CONTROLLER}/getDueSoonBills`)).data;
  }

  export async function getMonthlyEntries() {
    return (await api.get<MonthEntry[]>(`${CONTROLLER}/getMonthlyEntries`)).data;
  }

  export async function getMonthlyBalances() {
    return (await api.get<MonthBalance[]>(`${CONTROLLER}/getMonthlyBalances`)).data;
  }

  export async function getMonthlyStocks() {
    return (await api.get<MonthStocks[]>(`${CONTROLLER}/getMonthlyStocks`)).data;
  }

  export async function getMonthlyDebts() {
    return (await api.get<MonthDebt[]>(`${CONTROLLER}/getMonthlyDebts`)).data;
  }
}
