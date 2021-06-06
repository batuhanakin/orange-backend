const responseHandler = {
  error: (res, error, status = 500) => {
    console.log("error: ", error);
    const obj = {};
    if (status === 404) {
      obj.message = (error && error.message) || "Sayfa bulunamadı.";
      obj.status = (error && error.status) || "";
    } else if (status === 401) {
      obj.message = (error && error.message) || "Yetki yok!";
      obj.status = (error && error.status) || "";
    } else {
      obj.message = (error && error.message) || "Hata!";
      obj.status = (error && error.status) || "";
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
