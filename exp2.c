#include<stdio.h>
#include<pthread.h>
#include<semaphore.h>
#include<unistd.h>
sem_t empty;
sem_t full;
pthread_mutex_t mutex;
//int buffer[10]={0,0,0,0,0,0,0,0,0,0};

/*void sha(){
    printf("\n");
    for(int i=0;i<10;i++){
        printf("%d",buffer[i]);
    }
    printf("\n");
}*/
void *producer(void ){
    while(1){
       
        int e;
        int f;
        sem_getvalue(&empty,&e);
        sem_getvalue(&full,&f);
        if(e!=0){
            sem_wait(&empty);
            pthread_mutex_lock(&mutex);
            //buffer[((f+1)%11)-1]=1;  
            printf("producer produced item %d\n",f+1);  
            pthread_mutex_unlock(&mutex);
            sem_post(&full);
            sleep(1);            
        }
        else
        {
            printf("buffer is full\n");
            sleep(4);
        }
    }  
}

void *consumer(void ){
    while(1){
       
        int e;
        int f;
        sem_getvalue(&empty,&e);
        sem_getvalue(&full,&f);
        if(f!=0){
            sem_wait(&full);
            pthread_mutex_lock(&mutex);
            //buffer[(10-e)-1]=0;
            printf("Consumer consume Item %d \n",10-e);
            pthread_mutex_unlock(&mutex);
            sem_post(&empty);
            sleep(5);
        }
        else
        {
            printf("buffer is empty\n");
            sleep(1);
        }
       
    }
}

int main()
{  

    pthread_t pro;
    pthread_t con;
    pthread_mutex_init(&mutex, NULL);
    sem_init(&empty,0,10);
    sem_init(&full,0,0);

   
 
    pthread_create(&con,NULL,(void*)consumer,NULL);
    pthread_create(&pro,NULL,(void*)producer,NULL);
   

    pthread_join(pro,NULL);
    pthread_join(con,NULL);
    pthread_mutex_destroy(&mutex);
    sem_destroy(&empty);
    sem_destroy(&full);

    return 0;
   
}

	
	
	

