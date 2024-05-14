/*
 * Created by Suastika Adinata on Tue May 14 2024
 * Copyright (c) 2024 - Made with love
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json'
import id from './translations/id.json'

i18n
	.use(initReactI18next)
	.init({
		compatibilityJSON: 'v3',
		resources: {
			en: {
				translation: en
			},
			id: {
				translation: id
			}
		},
		lng: "en",
		fallbackLng: "en",
		interpolation: {
            escapeValue: false
		}
	});
export default i18n;