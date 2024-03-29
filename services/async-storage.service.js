export default {
    query,
    get,
    post,
    put,
    remove,
};

function query(entityType, delay = 50) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

function get(entityType, entityId) {
    return query(entityType).then((entities) => {
        const entity = entities.find((entity) => entity._id === entityId);
        if (!entity) throw new Error(`Unknown Entity ${entityId}`);
        return entity;
    });
}

function post(entityType, newEntity, append = true) {
    newEntity._id = _makeId();
    return query(entityType).then((entities) => {
        append ? entities.unshift(newEntity) : entities.unshift(newEntity);
        _save(entityType, entities);
        return newEntity;
    });
}

function put(entityType, updatedEntity) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex(
            (entity) => entity._id === updatedEntity._id
        );
        entities.splice(idx, 1, updatedEntity);
        _save(entityType, entities);
        return updatedEntity;
    });
}

function remove(entityType, entityId) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === entityId);
        if (idx < 0) throw new Error(`Unknown Entity ${entityId}`);
        entities.splice(idx, 1);
        _save(entityType, entities);
    });
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
    var text = '';
    var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
