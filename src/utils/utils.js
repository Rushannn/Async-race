/* eslint-disable class-methods-use-this */
class Utils {
  getRandomElement(arr) {
    return arr[Math.floor(Math.random() * (arr.length - 1))];
  }

  getRandomColor() {
    const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export const utils = new Utils();