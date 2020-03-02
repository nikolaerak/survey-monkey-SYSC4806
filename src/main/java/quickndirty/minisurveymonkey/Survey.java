package quickndirty.minisurveymonkey;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Survey {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="SURVEY_SEQ_GEN")
    @SequenceGenerator(name="SURVEY_SEQ_GEN", sequenceName="SURVEY_SEQ_GEN")
    protected int ID;
    @OneToMany(cascade = CascadeType.ALL)
    protected List<Question> questions;

    private String name;

    private boolean isClosed;

    public Survey(){
        // create survey with default name
        this("");
    }

    public Survey(String name) {
        questions = new ArrayList<Question>();
        this.name = name;
        this.isClosed = false;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public void addQuestion(Question q){
        this.questions.add(q);
    }

    public void removeQuestion(Question q){
        this.questions.remove(q);
    }

    public boolean isClosed(){
        return this.isClosed;
    }

    public void close(){
        this.isClosed=true;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int size(){
        return this.questions.size();
    }

    public String toString(){
        String s = "Survey "+this.getName()+" questions:\n";
        for(Question q: questions){
            s+=q.toString();
            s+="\n";
        }
        return s;

    }





}


