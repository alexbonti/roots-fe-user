import moment from "moment-timezone";

class TextHelper {
  /**
   * @author Sanchit Dang
   * @param {String} str String to Translate 
   * @returns {String} Sentencecased String
   */
  sentenceCase(str) {
    str = String(str);
    str = str.toLowerCase();
    return str.replace(/[a-z]/i, (letter) => letter.toUpperCase()).trim();
  }

  /**
   * @author Sanchit Dang
   * @param {String} time 
   * @returns {String} Titlecased String
   */
  titleCase(str) {
    str = String(str);
    str = str.toLowerCase().split(" ");
    let final = [];
    for (let word of str) {
      final.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return final.join(" ");
  }

  /**
   * @author Sanchit Dang
   * @param {String} time 
   * @returns {Date} Formatted Date
   */
  formatTime(time) {
    let newTime = new Date(time);
    return typeof newTime === "object" ? newTime.toLocaleDateString("en-US") : newTime;
  }

  /**
  * @author Sanchit Dang
  * @param {String} email Email Id
  * @returns {Boolean} isEmailValid
  */
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * 
   * @param {Date} date Date to be formatted
   * @returns {String} Formatted date
   */
  formatToD_MMMM_YYYY(date) {
    if (date === undefined) return "";
    return moment(date).format("D MMMM YYYY");
  }

  /**
   * 
   * @param {Date} date Date to be formatted
   * @returns {String} Formatted date
   */
  formatToMMMM_YYYY(date) {
    if (date === undefined) return "";
    return moment(date).format("MMMM YYYY");
  }


  /**
   * 
   * @param {Object} data Data to send
   * @param {String} data.content [Required] Content to truncate 
   * @param {Number} data.words [Optional] Max no of words 
   */
  truncate({ content, words = 160, addDots = false }) {
    if (content === undefined) return "";
    let truncatedContent;
    if (content instanceof String)
      truncatedContent = content.split(" ").splice(0, words).join(" ");
    truncatedContent = String(content).split(" ").splice(0, words).join(" ");
    if (addDots) return truncatedContent + "...";
    return truncatedContent;
  }

  /**
   * @description Remove HTML Tags from a string
   * @param {String} str 
   */
  removeHTMLTags(str) {
    if ((str === null) || (str === ""))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, "");
  }
}

const instance = new TextHelper();
export default instance;
