/*
 * Created by Suastika Adinata on Thu May 16 2024
 * Copyright (c) 2024 - Made with love
 */

export const currencyFormat = (num: number | undefined) => {
	return num ? 'Rp ' + num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 'Rp 0';
}