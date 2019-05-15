'use strict'

class TODO {
    constructor(comment, fileName) {
        if (this.isFormatSpecial(comment)) {
            const commentInfo = comment.split(';');
            const toDoComment = commentInfo.slice(2).join(';').trim();
            this.importance = toDoComment.includes('!') ? toDoComment.match(/!/g).length : 0;
            this.user = commentInfo[0].trim();
            this.date = commentInfo[1].trim();
            this.comment = toDoComment.trim();
        } else {
            this.importance = comment.includes('!') ? comment.match(/!/g).length : 0;
            this.user = '';
            this.date = '';
            this.comment = comment.trim();
        }
        this.fileName = fileName;
    }

    /** Функция проверяет, является ли комментарий в специальном формате
     * @param {String} comment – комментарий в виде строки
     * @returns {Boolean}
     */
    isFormatSpecial(comment) {
        const commentInfo = comment.split(';');
        if (commentInfo.length < 3 ||
            !this.isCorrectDate(commentInfo[1].trim())) {
            return false;
        }

        return true;
    }

    /** Функция проверяет переданную строку на соответствие формату: yyyy-mm-dd
     * @param {String} str – строковое представление даты
     * @returns {Boolean}
     */
    isCorrectDate(str) {
        if (!/^\d{4}-\d{2}-\d{2}$/gi.test(str)) {
            return false;
        }
        const date = new Date(str);
        if (date.toString() === 'Invalid Date') {
            return false;
        }

        return true;
    }

    isEmpty() {
        return (this.user === '' && this.date === '' && this.comment === '');
    }

    doesSatisfy(parameter) {
        if (parameter === undefined) {
            // Для команд: show, sort {importance | user | date}
            return true;
        } else if (parameter === 'important') {
            return this.comment.includes('!')
        } else if (parameter.startsWith('user ')) {
            const userParameter = parameter.replace(/user\s*/gi, '');
            return userParameter.length ?
                this.user.toLowerCase().startsWith(userParameter.toLowerCase()) :
                false;
        } else if (/^date \d{4}(-\d{2}){0,2}$/gi.test(parameter) &&
            /^\d{4}(-\d{2}){0,2}$/gi.test(this.date)) {
            const parameterDate = new Date(parameter.split(' ')[1]);
            const date = new Date(this.date);
            if (date >= parameterDate) {
                return true;
            }
        }

        return false;
    }
}

module.exports = {
    TODO
}
