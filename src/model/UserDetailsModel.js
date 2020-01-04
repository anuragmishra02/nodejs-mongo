class UserDetails {
    constructor(authProviderUserId, accountTypeId, attributeName, acccountStatus, privacy, termsCondition, createdDate, updateDate) {
        this.authProviderUserId = authProviderUserId,
            this.accountTypeId = accountTypeId,
            this.attributeName = attributeName,
            this.acccountStatus = acccountStatus,
            this.privacy = privacy,
            this.termsCondition = termsCondition,
            this.createdDate = createdDate,
            this.updateDate = updateDate
    }
}
module.exports = UserDetails;