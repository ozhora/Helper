import Vue from 'vue'
import Swal from "sweetalert2"

Vue.mixin({
  methods: {
    confirm(gagal, berhasil){
      if(gagal != ""){
        Swal.fire({
            title: "Failed!",
            text: gagal,
            icon: "error",
            showConfirmButton: false,
            timer: 1000
        })
      }
      if(berhasil != ""){
        Swal.fire({
          title: "Success!",
          text: berhasil,
          icon: "success",
          showConfirmButton: false,
          timer: 1000
        })
      }
    },
    confirm_title(gagal, berhasil, title){
      if(gagal != ""){
        if(title === '' || title === undefined) {
          Swal.fire({
            title: "Failed!",
            text: gagal,
            icon: "error",
            showConfirmButton: false,
            timer: 1000
          })
        } else {
          Swal.fire({
            title: title,
            text: gagal,
            icon: "error",
            showConfirmButton: false,
            timer: 1000
          })
        }

      }
      if(berhasil != ""){
        if(title === '' || title === undefined) {
          Swal.fire({
            title: "Success!",
            text: berhasil,
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          })
        } else {
          Swal.fire({
            title: title,
            text: berhasil,
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          })
        }
      }
    },
    delConf(titleText, textText, iconCategory, confirmText, callback) {
      if(titleText === ''){ titleText = "Are you sure?" }
      if(textText === ''){ textText = "" }
      if(iconCategory === ''){ iconCategory = "warning" }
      if(confirmText === ''){ confirmText = "Delete" }

      Swal.fire({
        title: titleText,
        text: textText,
        icon: iconCategory,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText,
      }).then((result) => {
        if (result.value) {
          return callback(true)
        }
        return callback(false)
      });
    },
    handleResponse: async function(promise){
      var myObj = new Object()
      try {
        let data = await promise
        myObj['status'] = true
        myObj['data'] = data
        return myObj
      } catch (error) {
        myObj['status'] = false
        myObj['data'] = error
        return myObj
      }
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isAlphabet(evt) {
      if(!(/[a-z]/i.test(evt.key))) {
        evt.preventDefault()
      } else {
        return /[a-z]/i.test(evt.key)
      }
    },
    myDateFormat(d){
      let tgl = new Date(d)
      return tgl.getFullYear() + "-" + ("0"+(tgl.getMonth()+1)).slice(-2) + "-" + ("0" + tgl.getDate()).slice(-2) ;
    },
    myDateFormat2(d){
      let tgl = new Date(d)
      return ("0" + tgl.getDate()).slice(-2)+'-'+("0"+(tgl.getMonth()+1)).slice(-2)+'-'+tgl.getFullYear();
    },
    myDateFormatText(d){
      let tgl = new Date(d)
      if(isNaN(tgl.getTime())) {
        let data = d.split('-')
        tgl = new Date(data[1]+'/'+data[0]+'/'+data[2])

        let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        let monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return days[tgl.getDay()]+" , "+("0" + tgl.getDate()).slice(-2)+' '+monthNames[tgl.getMonth()]+' '+tgl.getFullYear();
      } else {
        let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        let monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        return days[tgl.getDay()]+" , "+("0" + tgl.getDate()).slice(-2)+' '+monthNames[tgl.getMonth()]+' '+tgl.getFullYear();
      }
      // return ( days[tgl.getDay()]+" , "+"0" + tgl.getDate()).slice(-2)+'-'+("0"+(tgl.getMonth()+1)).slice(-2)+'-'+tgl.getFullYear();
    },
    isValidDate(d) {
      return d instanceof Date && !isNaN(d.valueOf());
    },
    getDate() {
      let d = new Date();
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      return `${ye}-${mo}-${da}`;
    },
    datePlusOne() {
      let d = new Date();
      d.setDate(d.getDate() +1)
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      return `${ye}-${mo}-${da}`;
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    },
    formatRupiah(num){
      return 'Rp '+this.formatNumber(num);
    },
    base_url(data) {
      let url = location.origin;
      if(data == '' || data == null){
        return url;
      } else {
        return url+'/'+data;
      }
    },

  }
})
