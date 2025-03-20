const activityLogger = (req, res, next) => {
    console.log(`Consulta en la ruta: ${req.method} ${req.path} a las ${new Date().toISOString()}`);
    next();
};

export default activityLogger;