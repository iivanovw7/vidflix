
customRedirect = (page) => {
    window.location.href = `${page}`;
};



doSearch = () => {

    let  retrievedObject = localStorage.getItem('userInput');
    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    window.location.href = `/find?query=${JSON.parse(retrievedObject)}`;


};

getLastSearch = () => {
    let  retrievedObject = localStorage.getItem('userInput');
    window.location.href = `/find?query=${JSON.parse(retrievedObject)}`;
};

storeInput = (value) => {
    localStorage.setItem('userInput', JSON.stringify(value));

    let  retrievedObject = localStorage.getItem('userInput');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));
};