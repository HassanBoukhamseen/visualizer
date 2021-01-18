<h4> {Note: This application is not complete yet, but it does offer most of the functionality mentioned below} </h4> 
<p>
This application is meant to provide a simple user interface for beginners in the machine learning field.
Instead of programming the model and training it, the application abstracts away from the technicalities, allowing the user to
tackle the problem without having to think about implementation details. However, for that to be possible, the user will have to follow the
following documentation.
</p>

<h3> Format </h3>
<p>So far, the application is able to deploy the following machine learning models:</p>
<h4> Regression: </h4>
<ul>
<li>Simple Regression</li>
<li>Multivariable Regression</li>
<li>Support Vector Regression</li>
<li>Decision Tree Regression</li>
<li>Random Forest Regression</li>
</ul>
<h4> Classification: </h4>
<ul>
<li>Logistic Regression</li>
<li> KNN Classifier</li>
<li>Naïve Bayes Classifier</li>
<li>SVM Classifier</li>
<li>Decision Tree Classifier</li>
<li>DRandom Forest Classifierr</li>
</ul>
<h4> Clustering: </h4>
<ul>
<li>K Means Clustering</li>
<li>Hierarchal Clustering</li>
</ul>
<p>For that to be possible, the application accepts a standard format where features come first, and the
independent comes last in a csv format. Please refer to the following image for an example.</p>
<img src="kdfns"/>
<p>Observe that both Age and the Estimated Salary are independent variables, and the variable the user wishes to predict comes last in the table.</p>
<p>As for the graphical user interface, the interface is meant to be simple
(Honestly, I am more interested in getting this thing to work than making it good looking). The format that I have chosen to
implement is a block based one. Once a block is added (via clicking the + sign) the user has to then choose said block and use it for one of the
following operations:</p>
<ul>
<li> Visualize </li>
<li> Analyze </li>
<li> Edit Source Code</li>
</ul>
<h4>Visualize</h4>
<p>The visualize tab is where all the plotting features are located. There, the user has the
option to upload their csv files and choose to visualize it via 5 different options available to the user. </p>
 
<h4>Analyze</h4>
<p>The analyze tab is responsible for deploying the machine learning model on the selected file.
Once a file is uploaded, the block the user chose will present information pertaining to the respective model the user
chose to deploy. Generally, this information will be in the form of: Accuracy, Model Parameters, Predicted versus True values. </p>
 
<h4>Edit Source Code</h4>
<p>While the application is geared mostly towards beginners,
I thought adding a tab to give the user the capability to edit and tweak the python source would
add more functionality and make the application more customizable to the more experienced programmer.</p>


<p>After the user is done with working with the data, they can compile a pdf document out of the blocks
the user added. Simply press the Print Document bottom, which you can find at the bottom right, and a pdf will pop up in a separate window. </p>
