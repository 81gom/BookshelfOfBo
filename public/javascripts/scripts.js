function confirmDeletion() {
    if (confirm('Do you really want to delete this book?')) {
        return true;
    }
    else {
        event.stopPropagation();
        event.preventDefault();
    }

}