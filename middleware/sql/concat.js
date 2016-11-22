module.exports = class sql_contat {
  constructor() {
    this.sql = '';
  }
  if(boolean, sentence) {
    if (boolean) {
      this.sql += sentence + ' ';
    }
    return this;
  }
  where(boolean, sentence) {
    let is_where = /WHERE || where/.test(this.sql); 
    if (boolean) {
      this.sql += (is_where?'WHERE ':'AND ') + sentence + ' ';
    }
    return this;
  }
} 