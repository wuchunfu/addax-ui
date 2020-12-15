export default {
  str2ymd (val) {
    if (!val) return '--';
    return val.substring(0, 10);
  },
  str2ym (val) {
    if (!val) return '--';
    return val.substring(0, 7);
  },
  str2ymdhm (val) {
    if (!val) return '--';
    return val.substring(0, 16);
  },
  str2ytime (val) {
    if (!val) return '--';
    return val.substr(11, 5);
  }
}
