import * as React from 'react';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';
import { escape, random } from '@microsoft/sp-lodash-subset';
// import { Web, IWeb, sp } from "@pnp/sp/presets/all";
// import {sp} from "@pnp/sp/"'
// import { Web, ItemAddResult } from "@pnp/sp";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

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
         <button onClick={()=>this.createItem()}>ADD Item</button><br/>
         <button onClick={()=>this.getAllItems()}>get Item</button>
        </div>
      </section>
    );
  }
  public async componentDidMount() {
    // await this.fetchData();
  }

  // public async fetchData() {
   
  //   let web = Web(this.props.webURL);
  //   const items: any[] = await web.lists.getByTitle("Sample List").items.select("*").expand().get();
  //   console.log(items);
  //   this.setState({ Items: items });
  //   let html = await this.getHTML(items);
  //   this.setState({ HTML: html });
  // }
  private getAllItems = async () => {
    try {
      const items: any[] = await sp.web.lists.getByTitle("Sample List").items.get();
      console.log(items);
      if (items.length > 0) {
        var html = `<table><tr><th>Title</th><th>Description</th><th>Status</th></tr>`;
        items.map((item, index) => {
          html += `<tr><td>${item.Title}</td><td>${item.Description}</td><td>${item.Status}</td></li>`;
        });
        html += `</table>`;
        document.getElementById("allItems").innerHTML = html;
      } else {
        alert(`List is empty.`);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  private createItem = async () => {
    try {
      for(var i=1;i<=100;i++){
      const addItem = await sp.web.lists.getByTitle("Sample List").items.add({
        'Title': 'row '+i,
        'Description': 'row Description'+i,
        
      });
      console.log(addItem);
      alert(`Item created successfully with ID: ${addItem.data.ID}`);
    }
  }
    catch (e) {
      console.error(e);
    }
  }
  // public async AddItem(){
  //   // const sp = new spfi().using("https://sites.ey.com/sites/testcanda");
  //  let web = Web(this.context.pageContext.web.absoluteUrl);
    
  //   for(var i=0;i<10;i++){
  //     await web.lists.getByTitle("Sample List").items.add({
  //         'Title':'row'+i ,
  //         'Description':'row description'+i ,
  //         'Status':"random",
  //         'Priority':"Critical",
  //         // Issueloggedby:"geethika chennuri"
    
  //       }).then(i => {
  //         console.log(i);
  //       });
  //     }
  //       alert("Created Successfully");
  //       // this.setState({EmployeeName:"",HireDate:null,JobDescription:""});
  //       // this.fetchData();
  // }
}
