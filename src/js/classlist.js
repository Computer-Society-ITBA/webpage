export default function classlist(classes) {
    return classes.filter(item => !!item).join(' ')
}