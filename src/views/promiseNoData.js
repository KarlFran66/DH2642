function promiseNoData(promiseState){
    if (!promiseState.promise) {
        return <div>No data</div>;
    }

    if (promiseState.promise) {
        if (!promiseState.data && !promiseState.error) {
            return <img src={"https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"}></img>
        }

        if (!promiseState.data && promiseState.error) {
            return <div>{String(promiseState.error)}</div>
        }

        if (promiseState.data && !promiseState.error) {
            return false;
        }
    }
}

export default promiseNoData;