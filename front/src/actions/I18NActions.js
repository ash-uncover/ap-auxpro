import { ActionBase } from 'ap-flux'
import { Utils } from 'ap-react-bootstrap'

var load_i18n = new ActionBase({ name: 'LOAD_I18N' })

load_i18n.do = function(args) {
    Utils.checkMembers(args, ['path']);
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/assets/i18n/i18n_FR.json',
            dataType: 'json',
            success: function(response) {
                resolve(response)
            },
            error: function(error) {
                reject(error)
            }
        });
    });
}
