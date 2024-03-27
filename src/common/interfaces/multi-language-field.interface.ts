import { Locale } from '../constants/localization'

export interface IMultiLanguageField<T> extends Partial<Record<Locale, T>> {}
// or
// export type IMultiLanguageField<T> = Partial<Record<Locale, T>>
