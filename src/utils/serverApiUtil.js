/* eslint-disable class-methods-use-this */
import { API_BASE_URL, CARS_PER_GARAGE_PAGE } from '../constants/constants';

class ServerApiUtil {
  async getCars(page, limit = CARS_PER_GARAGE_PAGE) {
    try {
      const res = await fetch(`${API_BASE_URL}/garage?_page=${page}&_limit=${limit}`);
      return {
        items: await res.json(),
        count: res.headers.get('X-Total-Count'),
      };
    } catch (e) { console.log(e); }
  }

  async getCar(id) {
    const res = await fetch(`${API_BASE_URL}/garage/${id}`);
    return {
      ok: res.ok,
      data: await res.json(),
    };
  }

  async createCar(name, color) {
    await fetch(`${API_BASE_URL}/garage`, {
      method: 'POST',
      body: JSON.stringify({ name, color }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async updateCar(id, name, color) {
    await fetch(`${API_BASE_URL}/garage/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name, color,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async removeCar(id) {
    await fetch(
      `${API_BASE_URL}/garage/${id}`,
      { method: 'DELETE' },
    );
    await fetch(
      `${API_BASE_URL}/winners/${id}`,
      { method: 'DELETE' },
    );
  }

  async startCar(id) {
    const res = await fetch(
      `${API_BASE_URL}/engine?id=${id}&status=started`,
      { method: 'PATCH' },
    );
    return res.json();
  }

  async startDrive(id) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/engine?id=${id}&status=drive`,
        { method: 'PATCH' },
      );
      return await res.json();
    } catch (error) { console.log(error) }
  }

  async stopCar(id) {
    const res = await fetch(
      `${API_BASE_URL}/engine?id=${id}&status=stopped`,
      { method: 'PATCH' },
    );
    return res.json();
  }

  async getWinners(page, sort = 'id', order = 'ASC', limit = 10) {
    try {
      const res = await fetch(`${API_BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
      return {
        items: await res.json(),
        count: res.headers.get('X-Total-Count'),
      };
    } catch (e) { console.log(e); }
  }

  async getWinner(id) {
    const res = await fetch(`${API_BASE_URL}/winners/${id}`);
    return {
      ok: res.ok,
      items: await res.json(),
    };
  }

  async updateWinner(id, bestTime, wins) {
    await fetch(`${API_BASE_URL}/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        time: bestTime, wins,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createWinner(id, time, wins = 1) {
    await fetch(`${API_BASE_URL}/winners`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        wins,
        time,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const serverApiUtil = new ServerApiUtil();
