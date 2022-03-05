import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';

declare global {
  interface String {
    getStringBetween(start: String, end: String): String;
  }
}

String.prototype.getStringBetween = function ( start : String, end: String) : String {
  return String(this).match(new RegExp(start + "(.*)" + end));
};

console.log(`Table translates ( ) {
  value Varchar [ not null ]
}
Table sc as sss {
  value Varchar [ not null ]
}
Table translates {
  value Varchar [ not null ]
  languge_id bigint [ ref: > L.id, not null ]
  creator_id Integer [ not null ]
  creator_type Varchar [ not null ]
  about_id Integer [ not null ]
  about_type Varchar [ not null ]
  id SERIAL [ increment ]
  is_available Boolean [ default: true ]
  is_active Boolean [ default: true ]
  created_at DateTime [ default: 'now( )' ]
  updated_at DateTime [ default: 'now( )' ]
  delete_at DateTime [ null ]
}
Table ca ( ) {
  value Varchar [ not null ]
}`.getStringBetween('table ', ' {'));


export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // Vue.prototype.$axios = axios;
});
