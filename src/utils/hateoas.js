const prepareHateoas = async (entity, data) => {
    const results = data.map((v) => ({
        name: v.nombre, 
        href: `/${entity}/${v.id}`,
    }));

    const total = data.length;

    return {
        total,
        results,
    };
};

export default prepareHateoas;
