import { stripIndent } from 'common-tags';

const getPhaseTooltip = ({ id }) => {
  switch(id){
    case 'execution': return 'This step is in Execution phase';
    case 'preparation': return 'This step is in Preparation phase';
    case 'integration': return 'This step is in Integration phase';
  }
};

const getValueTooltip = (value) => {
  switch(value) {
    case 'Eligible':
        return stripIndent`
          In case of a first step, this is the total number of eligible HCPs​
          In case of a middle step, this is the total number of eligible HCPs coming from the previous step.​
          Eligible = HCPs included in the target selection of the campaign
        `;
    case 'Reached':
      return 'This is the total number of HCPs who entered this step';
    case 'CTOR':
      return stripIndent`
        The click-to-open rate (CTOR) compares the number of unique clicks to unique opens. This gives you a better gauge of how the design and messaging resonated with your target, since these clicks are only from HCPs that actually viewed your email​
        CTOR = Email Opened / Clicked
      `;
    case 'Response Rate':
        return 'This is the % of HCPs who submitted the form out of your total number of email delivered';
    case 'Attended':
        return 'This is the total number of HCPs who attended the event';
    case 'Approval Remaining':
        return '% of HCP who confirmed their attendance divided by the total number of HCP approved';
  }
};

const getActivityTooltip = (name) => {
  switch(name) {
    case 'Click-through Rate':
      return stripIndent`
        Click-through rate (CTR) shows you the engagement of the email. Unlike CTOR, this measure indicates activity out of everyone who received the email in their inbox.​
        CTR = Emails Clicked / (Sent – Bounced)
      `;
    case 'I attend':
    case 'I remotely attend':
    case 'I do not attend':
      return 'This is the % of HCPs who clicked on this specific CTA';
    case 'Unsubscribed':
      return 'This is the % of HCPs who clicked on the unsubscribed URL​';
    case 'Sent':
      return 'This is the % of emails sent whatever the HCP opened or not the email';
    case 'Bounced Rate':
      return 'This is the % of emails that have been rejected by the HCP mailbox. A firewall, an invalid email address or a full mailbox can be  the root cause';
    case 'Coverage Rate':
      return 'This is the % of HCPs from the initial target who have entered this step. Out off Targets are not included';
    case 'Out of Targets':
      return stripIndent`
        This is the % of non-eligible HCPs who received the email.​
        Non-eligible = HCPs not included in the initial target
      `;
    case 'Open Rate​':
        return 'This is the % of HCPs who opened the email out of the total number of email delivered';
    case 'Click Rate':
      return stripIndent`
        Click-through rate (CTR) shows you the engagement of the email. Unlike CTOR, this measure indicates activity out of everyone who received the email in their inbox.​
        CTR = Emails Clicked / (Sent – Bounced)
      `;
    case 'NPS':
      return 'The Net Promoter Score = % of promoters (respondents that gave a  9-10) – % of detractors (respondents that gave a 0-6)';
    case 'CSAT':
      return 'CSAT score is the sum of respondents that answered somewhat or very satisfied. Obviously, the higher the number the higher the satisfaction will be.';
    case 'F2F Approval':
      return 'This is the % of HCP who confirmed their attendance in F2F';
    case 'Confirmed Online':
      return 'This is the % of HCP who confirmed their attendance within the Janssen Website';
    case 'Cancelled':
      return 'This is the % of HCPs who cancelled their attendance';
  }
}

export {
  getValueTooltip,
  getPhaseTooltip,
  getActivityTooltip,
};
