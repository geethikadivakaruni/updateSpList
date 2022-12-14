import * as React from 'react';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';
import { escape, random } from '@microsoft/sp-lodash-subset';
import {useState} from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
// var Priorities=['Critical','High','Normal','Low'];
// var Statuses=['Blocked','By design',"Won't fix",'New','In progress','Completed','Duplicate'];
// const [Priority,randomPriority]=useState(0);
// const [Title,randomTitle]=useState(0);
//     const [Description,randomDescription]=useState(0);
    
//     const [Status,randomStatus]=useState(0);
//     const [AssignedTo,randomAssignedTo]=useState(0);
//     const [Issueloggedby,randomIssueloggedby]=useState(0);
export default class AddItem extends React.Component<IAddItemProps, {}> {

  public render(): React.ReactElement<IAddItemProps> {
    const {
      description,
      
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      // userDisplayName
    } = this.props;
    

    return (
      <section className={`${styles.addItem}`}>
        <div className={styles.welcome}>
          {/* <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} /> */}
          {/* <h2>Well done, {escape(userDisplayName)}!</h2> */}
          {/* <div>{environmentMessage}</div> */}
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
         <button onClick={()=>this.AddItem()}>ADD Item</button><br/>
         {/* <button onClick={()=>this.getAllItems()}>get Item</button> */}
        </div>
      </section>
    );
  }
  AddItem(): void {
  for(var i=1;i<5;i++){
    this.createItem(i)
  }
  alert(`Item created successfully`);
  
  }
  public async componentDidMount() {
   await this.randomPriority();
 
  }
  randomPriority() {
  //   //here we need to update random values
  var Priorities=['Critical','High','Normal','Low'];
 var Priority= Priorities[Math.floor(Math.random()*Priorities.length)]
 console.log(Priority) 
 return Priority
    
  }

  
 
  private createItem = async (i:any) => {
   

    const body: string = JSON.stringify({
      'Title': 'New Ticket '+i,
      'Description': ' Description of Ticket'+i,
       'Priority':this.randomPriority,
      // 'Status':'In progress',
    //   'Assignedto':Chennuri.Geethika@gds.ey.com,
    //  'Issueloggedby':'Chennuri.Geethika@gds.ey.com'
    });
  
    this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Sample List')/items`,
      SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=nometadata',
        'odata-version': ''
      },
      body: body
    })
  
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          response.json().then((responseJSON) => {
            // console.log(responseJSON);
            // alert(`Item created successfully with ID: ${responseJSON.ID}`);
          });
        } else {
          response.json().then((responseJSON) => {
            // console.log(responseJSON);
            // alert(`Something went wrong! Check the error in the browser console.`);
          });
        }
      }).catch((error: any) => {
        console.log(error);
      });
  }

    catch (e: any) {
      console.error(e);
    }
  }
  
