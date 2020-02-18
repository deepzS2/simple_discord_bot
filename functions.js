module.exports = {
    getMember: function (msg, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = msg.guild.members.get(toFind);

        if (!target && msg.mentions.members)
            target = msg.mentions.members.first();

        if (!target && toFind) {
            target = msg.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
            })
        }

        if (!target)
            target = msg.member;

        return target;
    },
    formatDate: function (date) {
        return new Intl.DateTimeFormat('pt-BR').format(date);
    }
}