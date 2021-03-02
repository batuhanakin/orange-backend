const responseHandler = {
  error: (res, error, status = 500) => {
    console.log("error: ", error);
    const obj = {};
    if (status === 404) {
      obj.message = "Sayfa bulunamadı.";
    } else if (status === 401) {
      obj.message = (error && error.message) || "Yetki yok!";
    } else {
      obj.message = (error && error.message) || "Hata!";
    }
    res.status(status).send(Object.assign(obj, { error: true }));
  },
  success: (res, obj = {}, status = 200) => {
    const responseObj = {};
    if (obj && obj.message) {
      responseObj.message = obj.message;
      delete obj.message;
    }
    responseObj.data = obj;
    res.status(status).send(Object.assign(responseObj, { success: true }));
  },
};

module.exports = responseHandler;
