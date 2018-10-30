import I18n from 'react-native-i18n'
import es from './es.json';
import en from './en.json';

I18n.fallbacks = true;

I18n.translations = {
  en,
  es,
}

module.exports = I18n;
