class I18NUtils {

    static getBrowserLanguage() {
        if (navigator.languages != undefined) 
            return navigator.languages[0]
        else 
            return navigator.language
    }

}

export default I18NUtils