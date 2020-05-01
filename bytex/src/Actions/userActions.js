export const addUser = (user) => {
    return {
        type : 'ADD_USER',
        data: user
    }
}

export const removeUser = (user) => {
    return {
        type : 'REMOVE_USER',
        data: user
    }
}

export const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        data: users
    }
}

export const filterUsers = (searchTerm) => {
    return {
        type: 'FILTER_USERS',
        data: searchTerm
    }
}